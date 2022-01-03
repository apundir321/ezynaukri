import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class JobService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any>(environment.apiUrl+`getAllJobs?pageItem=0&pageSize=1000`);
    }

    // delete(id: number) {
    //     return this.http.delete(`http://localhost:8080/users/${id}`);
    // }

    applyJob(jobId:string,userId:any)
    {
        return this.http.get(environment.apiUrl+'applyJob?jobId='+jobId+'&userId='+userId);
    }

    save(jobId:string,userId:any)
    {
        return this.http.get(environment.apiUrl+'saveJob?jobId='+jobId+'&userId='+userId);
    }

    getSavedJobs(userId:any)
    {
        return this.http.get(environment.apiUrl+'getSavedJobs?userId='+userId+"&pageItem=0&pageSize=10000");
    }

    deleteSavedJob(savedJobId:any)
    {
        return this.http.get(environment.apiUrl+'deleteSaveJob?savedJobId='+savedJobId);
    }

    deleteAppliedJob(appliedJobId:any)
    {
        return this.http.get(environment.apiUrl+'deleteAppliedJob?appliedJobId='+appliedJobId);
    }



    postJob(job: any,userId: number,categoryId: number,organizationId: number)
    {
        // let headers = new HttpHeaders()
        // headers = headers.set('content-type','multipart/form-data')
        return this.http.post(environment.apiUrl+'postJob?userId='+userId+"&organizationId="+organizationId+"&categoryId="+categoryId,job);
    }

    getAppliedJobs(userId: number)
    {
        return this.http.get(environment.apiUrl+'getAppliedJobs?userId='+userId+"&pageItem=0&pageSize=10000");
    }

    getJobDetail(jobId: number)
    {
        return this.http.get(environment.apiUrl+'getJobDetail?jobId='+jobId);
    }

    getJobsById(postData:any)
    {
        let headers = new HttpHeaders()
        headers=headers.set('content-type','application/json')
        return this.http.post(environment.apiUrl+'getJobs',postData,{headers:headers});
    }

    getFilterByTags(postData:any)
    {
        let headers = new HttpHeaders()
        headers=headers.set('content-type','application/json')
        return this.http.post(environment.apiUrl+'getFilterJobs',postData,{ 'headers': headers });
    }

    getUserProfile(userId: number)
    {
        return this.http.get(environment.apiUrl+'getProfile?userId='+userId);
    }

    getCategories()
    {
        return this.http.get(environment.apiUrl+'getCategories');
    }

    getOrgs()
    {
        return this.http.get(environment.apiUrl+'getOrganizations');
    }

    postOrganization(orgData:any,categoryId : number)
    {
        // let headers = new HttpHeaders()
        // headers=headers.set('content-type','application/json')
        return this.http.post(environment.apiUrl+'addOrganization?categoryId='+categoryId,orgData);
    }

    updateProfilePic(profileData:any,userId : number)
    {
        // let headers = new HttpHeaders()
        // headers=headers.set('content-type','application/json')
        return this.http.post(environment.apiUrl+'updateProfilePic?userId='+userId,profileData);
    }

    updateRecruiterProfilePic(profileData:any,userId : number)
    {
        // let headers = new HttpHeaders()
        // headers=headers.set('content-type','application/json')
        return this.http.post(environment.apiUrl+'updateRecruiterProfilePic?userId='+userId,profileData);
    }

    uploadResume(profileData:any,userId : number)
    {
        // let headers = new HttpHeaders()
        // headers=headers.set('content-type','application/json')
        return this.http.post(environment.apiUrl+'updateResume?userId='+userId,profileData);
    }

    addCategory(categoryData:any)
    {
        // let headers = new HttpHeaders()
        // headers=headers.set('content-type','application/json')
        return this.http.post(environment.apiUrl+'addCategory',categoryData);
    }


    getOrgsByCriteria(orgData:any)
    {
        let headers = new HttpHeaders()
        headers=headers.set('content-type','application/json')
        return this.http.post(environment.apiUrl+'getOrgsByCriteria',orgData,{headers:headers});
    }
}