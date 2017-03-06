
import { FormControl } from '@angular/forms';

export class CheckBoxValidator {
    
    static isValid(control: FormControl): any {
        console.log(control.value);
        return control.value;
    }
 
}