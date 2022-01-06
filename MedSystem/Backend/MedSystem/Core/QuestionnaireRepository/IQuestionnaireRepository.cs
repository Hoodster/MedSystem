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
        public void CreateDatabaseConnection(ApplicationDbContext applicationDbContext, QuestionnaireDTO questionnaire);
        public Task<Questionnaire> GetCurrentUserQuestionnaireAsync(ApplicationDbContext applicationDbContext, IAccountRepository accountRepository);
        public Task UpdateCurrentUserQuestionnaireAsync(ApplicationDbContext applicationDbContext, IAccountRepository accountRepository, QuestionnaireDTO questionnaire);
    }
}
