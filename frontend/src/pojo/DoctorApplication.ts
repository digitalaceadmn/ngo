export default interface DoctorApplication  {
    id?: number; 
    full_name: string;
    date_of_birth?: string;
    gender?: string;
    mobile_number: string;
    email: string;
    address?: string;
    medical_registration_no: string;
    qualification?: string;
    specialization?: string;
    years_of_experience?: number;
    current_hospital_clinic?: string;
    location_city_state?: string;
    preferred_mode_of_consultation?: string;
    languages_spoken?: string;
    areas_of_interest?: string[]; 
}