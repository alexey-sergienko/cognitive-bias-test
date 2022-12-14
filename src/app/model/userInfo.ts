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

export interface UserInfo {
  firstName: string
  lastName: string
  age: number
  yearsOfEducation: number
  gender: string

  isFatherLeftHanded: boolean
  isMotherLeftHanded: boolean
  brotherCount: number
  leftHandedBrotherCount: number
  sisterCount: number
  leftHandedSisterCount: number

  // handPreferences: HandPreference[] // questions (1-12)
}
