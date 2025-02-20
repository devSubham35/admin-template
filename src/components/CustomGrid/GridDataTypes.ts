export type TRow = {
    _id: string
    name: string;
    email: string;
    phone: number;
    online: boolean;
    registrationDate: string;
    role: "Admin" | "User" | "Manager";
    productStatus: "Done" | "Pending" | "Canceled" | "Processing"
}

export enum UserRole {
    User = "User",
    Admin = "Admin",
    Manager = "Manager",
}

export enum Status {
    Done = "Done",
    Pending = "Pending",
    Canceled = "Canceled",
    Processing = "Processing",
}
