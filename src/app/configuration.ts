export class webConfig {
    public static APIBaseUrl: string = 'https://api.freeprojectapi.com/';
    public static GetCategory: string = this.APIBaseUrl + 'api/Enquiry/get-categories';
    public static Getstatuses: string = this.APIBaseUrl + 'api/Enquiry/get-statuses';
    public static SaveEnquiry: string = this.APIBaseUrl + 'api/Enquiry/create-enquiry';
    public static GetEnquiry: string = this.APIBaseUrl + 'api/Enquiry/get-enquiries';
    public static UpdateEnquiry: string = this.APIBaseUrl + 'api/Enquiry/update-enquiry';
    public static GetEnquiryById: string = this.APIBaseUrl + 'api/Enquiry/get-enquiry/';
}