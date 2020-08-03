import yup from "yup";
import { GovAndAdminList } from "../Lists/GovAndAdminList.js";
import { AreaOfGovAndAdminList } from '../Lists/AreaOfGovAndAdmin.js';
import { CityList } from '../Lists/CityList.js';

const include_gov = (value)=>{
    return new Promise((resolve, reject) => {
      if(GovAndAdminList.includes(value)){
          resolve(true);
      }
      else{
          reject(false);
      }
    })   
}

const include_area = (value)=>{
    return new Promise((resolve, reject) => {
      if(AreaOfGovAndAdminList.includes(value)){
        resolve(true);
      }
      else{
          reject(false);
      }
    })
}

const include_city = (value)=>{
    return new Promise((resolve, reject) => {
      if(CityList.includes(value)){
        resolve(true);
      }
      else{
          reject(false);
      }
    })
    
}

const reportValidationSchema = yup.object().shape({
    gov_admin: yup
        .string()
        .required()
        .test('gov', '', async (value)=> await include_gov(value)),
    area_of_gov_admin: yup
        .string()
        .required()
        .test('area_gov', '', async (value) => await include_area(value)),
    city: yup
        .string()
        .required()
        .test('city', '', async (value) => await include_city(value)),
    date: yup
        .string()
        .required(),
    // report: yup
    //     .string()
    //     .required(),
    report_for: yup
        .string()
        .required()
})
export default reportValidationSchema;