using MedSystem.Core.AccountRepository;
using MedSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Core.QuestionnaireRepository
{
    public class QuestionnaireRepository : IQuestionnaireRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IAccountRepository _accountRepository;
        public void CreateDatabaseConnection( QuestionnaireDTO questionnaire)
        {
            var questionnaireModel = new Questionnaire(questionnaire);
            _applicationDbContext.HealthQuestionnaires.Add(questionnaireModel);
            _applicationDbContext.SaveChanges();
        }
        public async Task<Questionnaire> GetCurrentUserQuestionnaireAsync()
        {
            var currentUser = await _accountRepository.GetCurrentUser();
            var userQuestionnaire = _applicationDbContext.HealthQuestionnaires
                .Single(q => q.PatientId == currentUser.PatientId.Value);

            return userQuestionnaire;
        }

        public async Task UpdateCurrentUserQuestionnaireAsync( QuestionnaireDTO questionnaire)
        {

            var currentUser = await _accountRepository.GetCurrentUser();
            var oldQuestionnaire = _applicationDbContext.HealthQuestionnaires
                .Single(q => q.PatientId == currentUser.PatientId.Value);
            if (oldQuestionnaire != null)
            {
                foreach (var property in questionnaire.GetType().GetProperties())
                {
                    var oldValue = property.GetValue(oldQuestionnaire);
                    var currentValue = property.GetValue(questionnaire);
                    if (!currentValue.Equals(oldValue))
                    {
                        property.SetValue(oldQuestionnaire, property.GetValue(questionnaire));
                    }
                }
                _applicationDbContext.SaveChanges();
            }
        }
    }
}
