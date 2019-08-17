export class AppConstants {
    public static get localhost(): string {
        // For vm
        return 'http://192.168.0.27:4200';

        // For same machine
        // return 'http://localhost:4200';
    }
    public static get apiURL(): string {
        // For vm
        return 'http://192.168.0.27:5000';

        // For same machine
        // return 'http://localhost:5000';
    }
}