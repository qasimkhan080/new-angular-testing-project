export class TaskModel {
    Id: number;
    Description: string;
    MonthId: number;
    Year: number;
    StatusId: number;
    IsActive: boolean;
    CreatedBy: number;
    CreatedDate: Date | string;
    ModifiedBy: number | null;
    ModifiedDate: Date | string | null;
    SubTasks: SubTaskModel[];
}
export class SubTaskModel {
    Id: number;
    Description: string;
    TaskId: number;
    IsActive: boolean;
    JiraTickets: JiraTicketModel[]
}

export class JiraTicketModel {
    Id: number;
    SubTaskId: number;
    JiraticketId: number;
}
export class MonthModel {
    Id: number;
    MonthName: string;
}

export class YearModel {
    Year: number;
}

export class HelpDeskModel {
    Id: number;
    Category: string;
    Value: number;
    Month: number;
    Year: number;
}

export class WebTrend{
    WebTrendSiteData: WebTrendSiteDataModel[];
    WebTrendNAEPLinkData: WebTrendNAEPLinkDataModel[];
    WebTrendNRCLinkData: WebTrendNRCLinkDataModel[];
    WebTrendTermData: WebTrendTermDataModel[];
    WebTrendResourceData: WebTrendResourceDataModel[];
}

export class WebTrendSiteDataModel{
    Name: string;
    Description: string;
    Status: string;
    Icon: string;
}

export class WebTrendNAEPLinkDataModel{
    Link: string;
    Status: string;
    Icon: string;
}

export class WebTrendNRCLinkDataModel{
    Link: string;
    Status: string;
    Icon: string;
}

export class WebTrendTermDataModel{
    Term: string;
    Status: string;
    Icon: string;
}

export class WebTrendResourceDataModel{
    Description: string;
    Status: string;
    Icon: string;
}