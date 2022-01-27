using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using MedSystem.Core.Repositories.AdminRepository;
using MedSystem.Core.Repositories.DoctorRepository;
using MedSystem.Core.Repositories.PatientRepository;
using MedSystem.Core.Services;
using MedSystem.Exceptions;
using MedSystem.Models;
using MedSystem.Models.DTO;
using Microsoft.AspNetCore.Identity;

namespace MedSystem.Core.AccountRepository
{
    public class AccountRepository : IAccountRepository
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private RoleManager<IdentityRole> _roleManager;
        private ApplicationDbContext _dbContext;
        private IAuthenticationService _authenticationService;
        private IPatientRepository _patientRepository;
        private IDoctorRepository _doctorRepository;
        private IAdminRepository _adminRepository;

        public AccountRepository(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager,
            ApplicationDbContext dbContext,
            IAuthenticationService authenticationService,
            IPatientRepository patientRepository,
            IDoctorRepository doctorRepository,
            IAdminRepository adminRepository)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _authenticationService = authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
            _roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
            _patientRepository = patientRepository ?? throw new ArgumentNullException(nameof(patientRepository));
            _doctorRepository = doctorRepository ?? throw new ArgumentNullException(nameof(doctorRepository));
            _adminRepository = adminRepository ?? throw new ArgumentNullException(nameof(adminRepository));
        }

        public async Task<string> CreateAccount(CreateUserDto user, string role)
        {
            var newUser = new User(user.FirstName, user.SecondName, user.LastName, user.Email, user.BirthDate, user.PESEL, user.PhoneNumber);
            var createUserResult = await _userManager.CreateAsync(newUser, user.Password);
            if (!createUserResult.Succeeded)
            {
                throw new Exception();
            }

            var registeredUser = await _userManager.FindByEmailAsync(user.Email);

            switch (role)
            {
                case ApplicationRoles.Patient:
                    await AddPatientAsync(registeredUser);
                    return registeredUser.PatientId.ToString();
                case ApplicationRoles.Doctor:
                    await AddDoctorAsync(registeredUser);
                    return registeredUser.DoctorId.ToString();
                case ApplicationRoles.Admin:
                    await AddAdminAsync(registeredUser);
                    return registeredUser.AdminId.ToString();
                default:
                    throw new Exception();
            }
        }

        public async Task<JwtSecurityTokenDTO> SignInAccount(UserCredentialsDto credentials)
        {
            var user = await _userManager.FindByEmailAsync(credentials.Email);
            if (user == null)
            {
                throw new AccountNotExistException();
            }

            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, credentials.Password, false);

            if (!signInResult.Succeeded)
            {
                throw new InvalidCredentialsException();
            }

            var roles = await _userManager.GetRolesAsync(user);

            var token = _authenticationService.GenerateJwtToken(user.Id, roles);

            return new JwtSecurityTokenDTO(token);
        }

        public async Task<User> GetCurrentUser()
        {
            var id = _authenticationService.GetCurrentUser();
            return await _userManager.FindByIdAsync(id);
        }

        public bool IsAccountExisiting(string email)
        {
           var result = _dbContext.Users.FirstOrDefault(x => x.Email == email);

            return (result != null);
        }

        private async Task AddPatientAsync(User user)
        {
            await AddToRoleAsync(user, ApplicationRoles.Patient);
            await _patientRepository.CreatePatientProfileAsync(user);
        }

        private async Task AddDoctorAsync(User user)
        {
            await AddToRoleAsync(user, ApplicationRoles.Doctor);
            await _doctorRepository.CreateDoctorProfileAsync(user);
        }

        private async Task AddAdminAsync(User user)
        {
            await AddToRoleAsync(user, ApplicationRoles.Admin);
            await _adminRepository.CreateAdminProfileAsync(user);
        }

        private async Task AddToRoleAsync(User user, string role)
        {
            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }
            await _userManager.AddToRoleAsync(user, role);

        }

        public async Task LockUserAsync(string email)
        {
            var endDate = new DateTime(9999, 12, 12);
            var user = await _userManager.FindByEmailAsync(email);
            user.LockoutEnabled = true;
            user.LockoutEnd = endDate;
            await _userManager.UpdateAsync(user);
        }

        public async Task UnlockUserAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            user.LockoutEnd = null;
            await _userManager.UpdateAsync(user);
        }

        public async Task<User> GetUserByMailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return user;
        }

        
    }
}