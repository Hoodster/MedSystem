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
        private readonly IQuestionnaireRepository _questionnaireRepository;

        public QuestionnaireController(IQuestionnaireRepository questionnaireRepository)
        {
            this._questionnaireRepository = questionnaireRepository;
        }

        [Route("questionnaire")]
        [HttpPost]
        public IActionResult AddHealthQuestionnaire([FromBody] QuestionnaireDTO questionnaire)
        {
            _questionnaireRepository.CreateDatabaseConnection( questionnaire);
            return Ok(questionnaire);
        }

        [Route("roleTest")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Patient")]
        [HttpPost]
        public IActionResult Index()
        {
            return Ok();
        }

        [Route("questionnaire")]
        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutQuestionnaireAnswersAsync([FromBody] QuestionnaireDTO questionnaire)
        {
            await _questionnaireRepository.UpdateCurrentUserQuestionnaireAsync(questionnaire);

            return Ok();
        }

        [Route("questionnaire")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetQuestionnaireAnswers()
        {
            var userQuestionnaire = await _questionnaireRepository.GetCurrentUserQuestionnaireAsync();

            return Ok(userQuestionnaire);
        }

        [Route("getQuestionnaireByPesel")]
        [HttpGet]
        public IActionResult GetQuestionnaireByPesel([FromQuery] string pesel)
        {
            var questionnaire = _questionnaireRepository.GetQuestionnaireByPesel(pesel);

            return Ok(questionnaire);
        }

    }
}
