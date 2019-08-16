export class AppConstants {
    public static get localhost(): string {
        // For vm
        // return 'http://192.168.1.24:4200';
        // For same machine
         return 'http://localhost:4200';
    }
    public static get apiURL(): string {
        return 'http://localhost:5000';
    }
}