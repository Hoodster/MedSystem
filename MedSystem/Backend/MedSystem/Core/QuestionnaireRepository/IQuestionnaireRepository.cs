using MedSystem.Core.AccountRepository;
using MedSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Core.QuestionnaireRepository
{
    public interface IQuestionnaireRepository
    {
        public void CreateDatabaseConnection(QuestionnaireDTO questionnaire);
        public Task<Questionnaire> GetCurrentUserQuestionnaireAsync();
        public Task UpdateCurrentUserQuestionnaireAsync(QuestionnaireDTO questionnaire);
        public IQueryable<Questionnaire> GetQuestionnaireByPesel(string pesel);
    }
}
