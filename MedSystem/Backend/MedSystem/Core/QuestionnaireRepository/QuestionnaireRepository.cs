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
        public void CreateDatabaseConnection(ApplicationDbContext applicationDbContext, QuestionnaireDTO questionnaire)
        {
            var questionnaireModel = new Questionnaire(questionnaire);
            applicationDbContext.HealthQuestionnaires.Add(questionnaireModel);
            applicationDbContext.SaveChanges();
        }
        public async Task<Questionnaire> GetCurrentUserQuestionnaireAsync(ApplicationDbContext applicationDbContext, IAccountRepository accountRepository)
        {
            var currentUser = await accountRepository.GetCurrentUser();
            var userQuestionnaire = applicationDbContext.HealthQuestionnaires
                .Single(q => q.PatientId.ToString().ToLower() == currentUser.PatientId.ToLower());

            return userQuestionnaire;
        }

        public async Task UpdateCurrentUserQuestionnaireAsync(ApplicationDbContext applicationDbContext, IAccountRepository accountRepository, QuestionnaireDTO questionnaire)
        {
            var currentUser = await accountRepository.GetCurrentUser();
            var oldQuestionnaire = applicationDbContext.HealthQuestionnaires
                .Single(q => q.PatientId.ToString().ToLower() == currentUser.PatientId.ToLower());
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
                applicationDbContext.SaveChanges();
            }
        }
    }
}
