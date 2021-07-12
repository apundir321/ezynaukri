import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(environment.apiUrl+`users`);
    }

    register(user: User,isRecruiter:any) {
        if(isRecruiter){
        return this.http.post(environment.apiUrl+`user/registration?recruiter=`+isRecruiter, user);
        }
        else{
            return this.http.post(environment.apiUrl+`user/registration`, user);
        }
    }

    delete(id: number) {
        return this.http.delete(environment.apiUrl+`users/${id}`);
    }

    getLocations() {
        return this.http.get(environment.apiUrl+`getLocations`);
    }

    getUser(userId: any) {
        return this.http.get(environment.apiUrl+`getUser?userId=`+userId);
    }

    saveProfile(userProfile: any,id:number) {
        return this.http.post(environment.apiUrl+`saveProfile?userId=`+id, userProfile);
    }

    addWorkExperience(workExperience: any,id:number) {
        return this.http.post(environment.apiUrl+`addWorkExperience?userId=`+id, workExperience);
    }

    addEducation(education: any,id:number) {
        return this.http.post(environment.apiUrl+`addEducation?userId=`+id, education);
    }

    addSkills(skills: any,id:number) {
         let headers = new HttpHeaders()
        headers = headers.set('content-type','application/json');
        return this.http.post(environment.apiUrl+`updateTags?userId=`+id, skills,{headers:headers});
    }

    get(userId: number) {
        return this.http.get(environment.apiUrl+`getUser?userId=`+userId);
    }

    getRecruiter(userId: number) {
        return this.http.get(environment.apiUrl+`getRecruiterProfile?recruiterId=`+userId);
    }

    getOrgDetail(orgId: number) {
        return this.http.get(environment.apiUrl+`getOrgDetail?orgId=`+orgId);
    }

    getRecruiters() {
        return this.http.get(environment.apiUrl+`getUsersByRole?roleName=ROLE_RECRUITER`);
    }

    getRecruitersByParams(payload: any) {
        let headers = new HttpHeaders()
       headers = headers.set('content-type','application/json');
       return this.http.post(environment.apiUrl+`filterRecruiterProfiles`, payload,{headers:headers});
   }

   getEmployeesByParams(payload: any) {
    let headers = new HttpHeaders()
   headers = headers.set('content-type','application/json');
   return this.http.post(environment.apiUrl+`filterEmployeesProfiles`, payload,{headers:headers});
}


}