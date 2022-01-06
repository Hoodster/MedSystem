using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using MedSystem.Models;

namespace MedSystem.Models
{
    public class QuestionnaireDTO 
    {
        public string HeartDiseases { get; set; }
        public string BloodDiseases { get; set; }
        public string LungDiseases { get; set; }
        public string RheumaticDiseases { get; set; }
        public string OphthalmicDiseases { get; set; }
        public string Cancers { get; set; }
        public string KidneyDisease { get; set; }
        public string LiverDisease { get; set; }
        public string Stroke { get; set; }
        public string Epilepsy { get; set; }
        public string Osteoporosis { get; set; }
        public string Aids { get; set; }
        public string Diabetes { get; set; }
        public string AllergyToAnesthetics { get; set; }
        public string DrugAllergy { get; set; }
        public string AllergyToDentalMaterials { get; set; }
        public string ConditionsNotMentioned { get; set; }
        public string TakeMedications { get; set; }
        public string SurgicalProcedures { get; set; }
        public string CytostaticDrugs { get; set; }
        public string OrganTransplant { get; set; }

        public QuestionnaireDTO(
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
            string organTransplant
        )
        {
            this.HeartDiseases = heartDiseases;
            this.BloodDiseases = bloodDiseases;
            this.LungDiseases = lungDiseases;
            this.RheumaticDiseases = rheumaticDiseases;
            this.OphthalmicDiseases = ophthalmicDiseases;
            this.Cancers = cancers;
            this.KidneyDisease = kidneyDisease;
            this.LiverDisease = liverDisease;
            this.Stroke = stroke;
            this.Epilepsy = epilepsy;
            this.Osteoporosis = osteoporosis;
            this.Aids = aids;
            this.Diabetes = diabetes;
            this.AllergyToAnesthetics = allergyToAnesthetics;
            this.DrugAllergy = drugAllergy;
            this.AllergyToDentalMaterials = allergyToDentalMaterials;
            this.ConditionsNotMentioned = conditionsNotMentioned;
            this.TakeMedications = takeMedications;
            this.SurgicalProcedures = surgicalProcedures;
            this.CytostaticDrugs = cytostaticDrugs;
            this.OrganTransplant = organTransplant;
        }

        public QuestionnaireDTO(QuestionnaireDTO questionnaire) 
        {
            this.HeartDiseases = questionnaire.HeartDiseases;
            this.BloodDiseases = questionnaire.BloodDiseases;
            this.LungDiseases = questionnaire.LungDiseases;
            this.RheumaticDiseases = questionnaire.RheumaticDiseases;
            this.OphthalmicDiseases = questionnaire.OphthalmicDiseases;
            this.Cancers = questionnaire.Cancers;
            this.KidneyDisease = questionnaire.KidneyDisease;
            this.LiverDisease = questionnaire.LiverDisease;
            this.Stroke = questionnaire.Stroke;
            this.Epilepsy = questionnaire.Epilepsy;
            this.Osteoporosis = questionnaire.Osteoporosis;
            this.Aids = questionnaire.Aids;
            this.Diabetes = questionnaire.Diabetes;
            this.AllergyToAnesthetics = questionnaire.AllergyToAnesthetics;
            this.DrugAllergy = questionnaire.DrugAllergy;
            this.AllergyToDentalMaterials = questionnaire.AllergyToDentalMaterials;
            this.ConditionsNotMentioned = questionnaire.ConditionsNotMentioned;
            this.TakeMedications = questionnaire.TakeMedications;
            this.SurgicalProcedures = questionnaire.SurgicalProcedures;
            this.CytostaticDrugs = questionnaire.CytostaticDrugs;
            this.OrganTransplant = questionnaire.OrganTransplant;
        }

        public QuestionnaireDTO()
        {
        }
    }
}
