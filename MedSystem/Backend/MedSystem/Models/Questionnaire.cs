using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;

namespace MedSystem.Models
{
    public class Questionnaire : QuestionnaireDTO
    {
        [Key]
        public Guid QuestionnaireID { get; set; }
        [ForeignKey("Patient")]
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
        public Questionnaire(

            Guid patientId,
            string heartDiseases,
            string bloodDiseases,
            string lungDiseases,
            string rheumaticDiseases,
            string ophthalmicDiseases,
            string cancers,
            string kidneyDisease,
            string liverDisease,
            string stroke,
            string epilepsy,
            string osteoporosis,
            string aids,
            string diabetes,
            string allergyToAnesthetics,
            string drugAllergy,
            string allergyToDentalMaterials,
            string conditionsNotMentioned,
            string takeMedications,
            string surgicalProcedures,
            string cytostaticDrugs,
            string organTransplant) 
            : base(
                heartDiseases,
                bloodDiseases,
                lungDiseases,
                rheumaticDiseases,
                ophthalmicDiseases,
                cancers,
                kidneyDisease,
                liverDisease,
                stroke,
                epilepsy,
                osteoporosis,
                aids,
                diabetes,
                allergyToAnesthetics,
                drugAllergy,
                allergyToDentalMaterials,
                conditionsNotMentioned,
                takeMedications,
                surgicalProcedures,
                cytostaticDrugs,
                organTransplant)
        {
            
        }

        public Questionnaire(QuestionnaireDTO questionnaire) : base(questionnaire) 
        {
        }

        public Questionnaire()
        {
        }
    }
}
