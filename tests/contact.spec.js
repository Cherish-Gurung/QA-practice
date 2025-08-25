import { test } from '@playwright/test';
import { LoginPage } from '../Pageobjects/login.po';
import { ContactPage } from '../Pageobjects/contact.po';
//here the json files are imported.

const{authenticateUser,createEntity,deleteEntity,getEntity}=require('./helper.spec.js')
let accessToken;
test.beforeEach(async({page}) => {
    const login=new LoginPage(page);
    await page.goto('/')
    await login.login(testData.validUser.userName,testData.validUser.password)
    await login.verifyValidLogin();
})

test.describe('Contact testCases', () => {
    test('Contact Add test', async({page,request}) =>{
        const contact=new ContactPage(page);
        await contact.contactAdd(contactTestData.contact.FirstName,contactTestData.contact.lastName,contactTestData.contact.dateOfBirth,contactTestData.contact.email,contactTestData.contact.phone,contactTestData.contact.state,contactTestData.contact.postal,contactTestData.contact.country);
        await contact.viewContact();
        await contact.validateContactCreated(contactTest)
    })

    test('Contact Edit test',async ({page,request})=>{
    const Data={
        "firstName":"John",
        "lastName":"Doe",
        "email":"erge@email.com",
        "dateOfBirth":"2004-07-26",
        "phone":"9808781502",
        "address":"Blalaaaak",
        "street1":"Address1",
        "city":"Some",
        "state":"state",
        "postal":"1234",
        "country":"AAA",
    };
    const contact= new ContactPage(page);
    accessToken= await authenticateUser(testData.validUser.userName,testData.validUser.password,{request});
    await createEntity(Data,accessToken,'/contacts',{request});
    page.reload();
    await contact.viewContact();
    await contact.contactEdit(contactTestData.contactEdit.firstName);
    await contact.validateContactCreated(contactTestData.contactEdit.firstName,contactTestData.contactEdit.lastName)
    })

    test.only('Contact Delete Test',async({page,request})=>{
        const Data={
        "firstName":"John",
        "lastName":"Doe",
        "email":"erge@email.com",
        "dateOfBirth":"2004-07-26",
        "phone":"9808781502",
        "address":"Blalaaaak",
        "street1":"Address1",
        "city":"Some",
        "state":"state",
        "postal":"1234",
        "country":"AAA"
    };
    const contact= new ContactPage(page);
    accessToken= await authenticateUser(testData.validUser.userName,testData.validUser.password,{request});
    await deleteEntity(Data,accessToken,'/contacts',{request});
    page.reload();
    await contact.viewContact();
    const id =  await getEntity(accessToken,'/contacts','200',{request});
    await contact.contactDelete();
    await validateEntity(accessToken,'/contacts/${id}','404',{request});
    })
})

