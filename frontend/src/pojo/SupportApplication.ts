export default interface SupportApplication {
  id?: number;
  name_or_org: string;
  type: string;
  contact_number: string;
  email: string;
  address_city?: string;

  ways_to_support?: string[]; 
  frequency?: string;
  approx_contribution?: number;
  skills_resources?: string;
  reason_for_prankiran?: string;
}