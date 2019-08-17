export class AppConstants {
    public static get localhost(): string {
        // For vm
        return 'http://192.168.0.27:4200';
        // For same machine
        // return 'http://localhost:4200';
    }
}