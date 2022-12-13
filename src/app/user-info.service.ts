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

import {Injectable} from '@angular/core';
import {UserInfo} from "./model/userInfo";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private USER_INFO_KEY = 'user_info';

  constructor() {
  }

  put(userInfo: UserInfo) {
    localStorage.setItem(this.USER_INFO_KEY, JSON.stringify(userInfo));
  }

  get(): UserInfo | null {
    let userInfo = localStorage.getItem(this.USER_INFO_KEY)
    if (userInfo) {
      return JSON.parse(userInfo)
    }
    return null;
  }
}
