//import { CheckBoxValidator } from './../../validators/checkbox';
import { ShowDataPage } from './../show-data/show-data';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public email: any = "";
  public name: any = "";
  public birthday: any = "";
  public gender: any = "";
  public civil: any = "";
  public interests: any={};

  public myForm: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['Masculino', Validators.required],
      civil: ['Soltero', Validators.required],
      //se añade un control  de tipo formgroup (formgroup anidado) con los intereses dentro de este formgroup (que son controles)
      interests: this.formBuilder.group({
        otro: false,
        meca: false,
        tics: false
      }, {//Se añade el validator que retorna lo del metodo validateInterests (final de archivo)
        validator: (formGroup: FormGroup) => {
          return this.validateInterests(formGroup);
        }
      }),
      email: ['', [<any>Validators.pattern(emailRegex), Validators.required]],
    });

    this.name = this.myForm.controls['name'];
    this.email = this.myForm.controls['email'];
    this.birthday = this.myForm.controls['birthday'];
    this.gender = this.myForm.controls['gender'];
    this.civil = this.myForm.controls['civil'];
    this.interests = this.myForm.controls['interests']
  }

  sendData() {
    let data = {
      name: this.name.value,
      email: this.email.value,
      birthday: this.birthday.value,
      gender: this.gender.value,
      civil: this.civil.value,
      interests: this.interests.value
    };
    console.log(data);
    this.navCtrl.push(ShowDataPage, data);

  }

  //Recorre los controles del formGroup
  private validateInterests(formGroup: FormGroup) {
  for (let key in formGroup.controls) {
    if (formGroup.controls.hasOwnProperty(key)) {
      let control: FormControl = <FormControl>formGroup.controls[key];
      if (control.value) {
        //Si el value del control es 'true' quiere decir que al menos uno esta seleccionado sino
        return null;
      }
    }
  }
  //retorna false
  return {
    validateInterests: {
      valid: false
    }
  };
}

}
