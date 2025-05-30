export type Email = {
    id: number;
    name: string;
    from: string;
    subject: string;
    text: string;
    read: string;
    deleted: boolean;
    labels: string[];
    createdAt: Date;
    accountId: number;
}

export type Account = {
    id: number;
    email: string;
    userId: number;
    emails: Email[];
}

export type User = {
    id: number;
    name: string;
    accounts: Account[];
}