using System;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
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
        private IAuthenticationService _authenticationService;
        private IPatientRepository _patientRepository;

        public AccountRepository(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager,
            IAuthenticationService authenticationService,
            IPatientRepository patientRepository)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
            _authenticationService = authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
            _roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
            _patientRepository = patientRepository ?? throw new ArgumentNullException(nameof(patientRepository));
        }

        public async Task<string> CreateAccount(CreateUserDto user)
        {
            var newUser = new User(user.FirstName, user.SecondName, user.LastName, user.Email, user.BirthDate, user.PESEL, user.PhoneNumber);
            var createUserResult = await _userManager.CreateAsync(newUser, user.Password);
            if (createUserResult.Succeeded)
            {
                var registeredUser = await _userManager.FindByEmailAsync(user.Email);
                if (!await _roleManager.RoleExistsAsync(ApplicationRoles.Patient))
                {
                   await _roleManager.CreateAsync(new IdentityRole(ApplicationRoles.Patient));
                }
                await _userManager.AddToRoleAsync(registeredUser, ApplicationRoles.Patient);
                await _patientRepository.CreatePatientProfileAsync(registeredUser);
                return registeredUser.Id;
            }

            throw new Exception();
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
    }
}