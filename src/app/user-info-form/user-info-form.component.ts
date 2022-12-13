/*
 * Copyright 2022 Alexey Sergienko.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, OnInit} from '@angular/core';
import {UserInfo} from "../model/userInfo";
import {NgForm} from "@angular/forms";
import {UserInfoService} from "../user-info.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.css']
})
export class UserInfoFormComponent implements OnInit {
  constructor(private userInfoService: UserInfoService, private router: Router) {
  }

  ngOnInit(): void {
  }

  submitUserInfo(form: NgForm) {
    if (!form.valid) {
      alert("Please fill out all the fields")
    } else {
      let userInfo: UserInfo = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        age: form.value.age,
        yearsOfEducation: form.value.yearsOfEducation,
        gender: form.value.gender,

        isFatherLeftHanded: form.value.isFatherLeftHanded,
        isMotherLeftHanded: form.value.isMotherLeftHanded,
        brotherCount: form.value.brotherCount,
        leftHandedBrotherCount: form.value.leftHandedBrotherCount,
        sisterCount: form.value.sisterCount,
        leftHandedSisterCount: form.value.leftHandedSisterCount,
      };

      this.userInfoService.put(userInfo);
      this.router.navigate(["/test"])
    }
  }

}
