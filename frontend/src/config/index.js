export const organizationHomeRoute = '/org/dashboard'
export const adminHomeRoute = '/admin/dashboard'
export const studentHomeRoute = '/dashboard'

export const studentLoginRoute = '/login'
export const adminLoginRoute = '/admin/login'
export const organizationLoginRoute = '/org/login'

export const studentRegisterRoute = '/signup'
export const organizationRegisterRoute = '/org/signup'

export const studentSettingRoute = '/dashboad/setting'
export const STUDENT_TEMPLATE_ROUTE = '/dashboad/template'

export const problemWithCode = '/problem/:_problemCode'
export const role = {
    admin: 'admin',
    student: 'student',
    organization: 'organization'
}

export const FRONT_END_ROUTE = 'http://localhost:3000/'
export const DEFAULT_PRACTICE_ROUTE = '/practice?sort=ASC'
export const DEFAULT_IDE_ROUTE = '/ide'

export const STARTER_TEMPLATE = {
    c: `
    #include<stdio.h>
    
    void solve() {
        // code here
    }

    int main() 
    {
        int TestCase;
        scanf("%d",&TestCase);

        while(TestCase--) {
            solve()
        }
        return 0;
    }`,
    cpp:`
    #include<iostream>
    using namespace std;

    int main() {
        // code here
        return 0;
    }
    `,
    java:`
    
    `,
    python:`
    
    `
}