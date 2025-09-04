export default interface NGOApplication {
  id?: number;
  ngo_name: string;
  registration_number?: string;
  date_of_registration?: string;
  registered_address?: string;
  website_social?: string;

  contact_full_name: string;
  contact_designation?: string;
  contact_email: string;
  contact_mobile: string;

  partnership_reason?: string;
  pillars?: string[];
  support?: string[];
}