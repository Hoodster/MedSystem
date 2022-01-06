using MedSystem.Core.AccountRepository;
using MedSystem.Core.QuestionnaireRepository;
using MedSystem.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MedSystem.Controllers
{
    [Route("api/patient")]
    [ApiController]
    public class QuestionnaireController : Controller
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IQuestionnaireRepository _questionnaireRepository;
        private readonly IAccountRepository _accountRepository;

        public QuestionnaireController(ApplicationDbContext dbContext, IQuestionnaireRepository questionnaireRepository, IAccountRepository accountRepository)
        {
            this._accountRepository = accountRepository;
            this._questionnaireRepository = questionnaireRepository;
            this._applicationDbContext = dbContext;
        }

        [Route("questionnaire")]
        [HttpPost]
        public IActionResult AddHealthQuestionnaire([FromBody] QuestionnaireDTO questionnaire)
        {
                questionnaireRepository.CreateDatabaseConnection(applicationDbContext, questionnaire);
                return Ok(questionnaire);   
        }

        [Route("questionnaire")]
        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> putQuestionnaireAnswersAsync([FromBody] QuestionnaireDTO questionnaire)
        {
           await questionnaireRepository.UpdateCurrentUserQuestionnaireAsync(_applicationDbContext, _accountRepository, _questionnaire);

            return Ok();
        }

        [Route("questionnaire")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> getQuestionnaireAnswers()
        {
            var userQuestionnaire = await questionnaireRepository.GetCurrentUserQuestionnaireAsync(_applicationDbContext, _accountRepository);

            return Ok(userQuestionnaire);
        }
    }
}
