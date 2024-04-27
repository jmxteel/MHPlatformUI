import { UserAuthenticationBase } from "../shared/security/user-authentication-base";

export class AppUserAuth extends UserAuthenticationBase {
    // canAccessProducts: boolean = false;
    // canAccessCategories: boolean = false;
    // canAccessLogs: boolean = false;
    // canAccessSettings: boolean = false;
    // canAddProduct: boolean = false;
    // canEditProduct: boolean = false;
    // canDeleteProduct: boolean = false;

    // This method is called by the AppUserAuthService to initialize the user object.
    override init(): void {
        super.init();

        // this.canAccessProducts = false;
        // this.canAccessCategories = false;
        // this.canAccessLogs = false;
        // this.canAccessSettings = false;
        // this.canAddProduct = false;
        // this.canEditProduct = false;
        // this.canDeleteProduct = false;       
    }
    getValueProperty(obj: any, key: string): boolean {
        // Te code below is equivalent to: 
        // let ret = securityObject.CanAccessProducts;
        // this is to make thing more 'Generic'
        let ret = obj[key];
        return ret;
    }
}