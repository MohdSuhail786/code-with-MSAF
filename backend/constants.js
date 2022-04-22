exports.RANK_COLOR = {
    0: '#F44336',
    1: '#666666',
    2: '#1E7D22',
    3: '#3366CC',
    4: '#684273',
    5: '#FFBF00',
    6: '#FF7F00',
    7: '#D0011B',
}

exports.CODE_TEMPLATES = {
    'c' : 
    `#include <stdio.h>
    int main() {
        // write your code here
        return 0;
    }`,
    'cpp' :
    `#include <iostream>
    using namespace std;
    int main() {
        // write your code here
        return 0;
    }`,
    'java' :
    `public class MSAF {
        public static void main(String[] args) {
            // write your code here
        }
    }`,
    'python' :
    `# write your code here`,
}

exports.LANGUAGE_BAR_COLOR = {
    'c' : 'secondary-red',
    'cpp' : 'secondary-yellow',
    'java' : 'secondary-cyan',
    'python' : 'secondary-violet',
}

exports.VERIFY_EMAIL_TEMPLATE = (user) => {
    return `
    <div style="margin:0;width:100%;padding:0;word-break:break-word;background-color:#eceff1">
    <div role="article" aria-label="Promotional Mail" lang="en" style="font-family:'Montserrat',sans-serif">
        <table style="width:100%;font-family:Montserrat,-apple-system,'Segoe UI',sans-serif" cellpadding="0" cellspacing="0" role="presentation">
            <tbody><tr>
                <td align="center" style="background-color:#eceff1;font-family:Montserrat,-apple-system,'Segoe UI',sans-serif">
                    <table class="m_-3685547745528727728sm-w-full" style="width:600px" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody>
                        <tr>
                            <td align="center" class="m_-3685547745528727728sm-px-24" style="font-family:'Montserrat',sans-serif">
                                <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tbody><tr>
                                        <td class="m_-3685547745528727728sm-px-24" style="border-radius:4px;background-color:#ffffff;padding:48px;text-align:left;font-family:Montserrat,-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:24px;color:#626262">
    
                                            
        
        <p style="font-family:'Montserrat',sans-serif;margin-bottom:0;font-size:20px;font-weight:600;margin-bottom:10px">
            Hey <span>
            ${user.name}</span>, <img data-emoji="👋" class="an1" alt="👋" aria-label="👋" src="https://fonts.gstatic.com/s/e/notoemoji/14.0/1f44b/32.png" loading="lazy">
        </p><p style="font-family:'Montserrat',sans-serif;margin:0;margin-top:12px;margin-bottom:24px">
        Welcome to CodingWorms.
        </p>
        <img src="https://ci5.googleusercontent.com/proxy/nltmCrZi5XI85GUpBGKPZc4L7TBWUxkKiSmtcFK7YZQ5MC4gEL7cyqtxh67MAmmO4wCdbJ3F4v-zSTKZriTOrI_gaSO2lT4JRYuspmsO7txuVfgmrXxIiYc_CTTYluM=s0-d-e1-ft#https://coditationevpoppov.sgp1.digitaloceanspaces.com/reset-password-v2.png" width="500" alt="Welcome" style="max-width:100%;vertical-align:middle;line-height:100%;border:0" class="CToWUd a6T" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 951.5px; top: 678.156px;"><div id=":1gw" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Download attachment " data-tooltip-class="a1V" data-tooltip="Download"><div class="akn"><div class="aSK J-J5-Ji aYr"></div></div></div></div>
        <p style="font-family:'Montserrat',sans-serif;margin:0;margin-top:24px;margin-bottom:24px">
            Please click on the below button to verify your account.
        </p>
        <table cellpadding="0" cellspacing="0" role="presentation">
            <tbody><tr>
                <td style="border-radius:4px;background-color:#7367f0;font-family:Montserrat,-apple-system,'Segoe UI',sans-serif">
                    <a href="http://localhost:3000/verify-account/${user.id}/${user.verificationCode}" style="font-family:'Montserrat',sans-serif;display:block;padding-left:24px;padding-right:24px;padding-top:16px;padding-bottom:16px;font-size:16px;font-weight:600;line-height:100%;color:#ffffff;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://0ph60.mjt.lu/lnk/CAAAAr57AmkAAAAAAAAAAAIF9FoAAAAANtsAAAAAABxIygBiTscDl-lksaGcSySFDTfKrAok0gAbC-U/1/hK-OLub4_xk1Qm-x1X1lGQ/aHR0cDovL2V2cG9waG9zdC5zMy13ZWJzaXRlLmV1LWNlbnRyYWwtMS5hbWF6b25hd3MuY29tL2F1dGgvdmVyaWZ5LzE4LzQ3NTVhNTQzLWZhZDYtNDlkMi04M2Q2LWQwNjg1YjJlZjUyMA&amp;source=gmail&amp;ust=1650608079047000&amp;usg=AOvVaw2p3GzbndlzjfGWrIVOAjPI">
                        Verify Account </a>
                </td>
            </tr>
        </tbody></table>
        <p style="font-family:'Montserrat',sans-serif;margin:0;margin-top:24px">
            The CodingWorms team
        </p>
        
                                        <p></p></td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-family:'Montserrat',sans-serif;height:20px"></td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
        </tbody></table>
        
        
        
    </div>
    
    <br>
    <div class="yj6qo"></div><div class="adL">
    </div></div>

    `
}

exports.QUERY_EMAIL_TEMPLATE = (admin) => {
    return `
    <div style="margin:0;width:100%;padding:0;word-break:break-word;background-color:#eceff1">
    <div role="article" aria-label="Promotional Mail" lang="en" style="font-family:'Montserrat',sans-serif">
        <table style="width:100%;font-family:Montserrat,-apple-system,'Segoe UI',sans-serif" cellpadding="0" cellspacing="0" role="presentation">
            <tbody><tr>
                <td align="center" style="background-color:#eceff1;font-family:Montserrat,-apple-system,'Segoe UI',sans-serif">
                    <table class="m_-3685547745528727728sm-w-full" style="width:600px" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody>
                        <tr>
                            <td align="center" class="m_-3685547745528727728sm-px-24" style="font-family:'Montserrat',sans-serif">
                                <table style="width:100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tbody><tr>
                                        <td class="m_-3685547745528727728sm-px-24" style="border-radius:4px;background-color:#ffffff;padding:48px;text-align:left;font-family:Montserrat,-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:24px;color:#626262">
    
                                            
        
        <p style="font-family:'Montserrat',sans-serif;margin-bottom:0;font-size:20px;font-weight:600;margin-bottom:10px">
            Hey <span>
            Admin</span>, <img data-emoji="👋" class="an1" alt="👋" aria-label="👋" src="https://fonts.gstatic.com/s/e/notoemoji/14.0/1f44b/32.png" loading="lazy">
        </p><p style="font-family:'Montserrat',sans-serif;margin:0;margin-top:12px;margin-bottom:24px">
        ${admin.username} has some query for you.
        </p>
        <img src="https://ci5.googleusercontent.com/proxy/nltmCrZi5XI85GUpBGKPZc4L7TBWUxkKiSmtcFK7YZQ5MC4gEL7cyqtxh67MAmmO4wCdbJ3F4v-zSTKZriTOrI_gaSO2lT4JRYuspmsO7txuVfgmrXxIiYc_CTTYluM=s0-d-e1-ft#https://coditationevpoppov.sgp1.digitaloceanspaces.com/reset-password-v2.png" width="500" alt="Welcome" style="max-width:100%;vertical-align:middle;line-height:100%;border:0" class="CToWUd a6T" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 951.5px; top: 678.156px;"><div id=":1gw" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" role="button" tabindex="0" aria-label="Download attachment " data-tooltip-class="a1V" data-tooltip="Download"><div class="akn"><div class="aSK J-J5-Ji aYr"></div></div></div></div>
        <p style="font-family:'Montserrat',sans-serif;margin:0;margin-top:24px;margin-bottom:24px">
            Query <br> ${admin.query}
        </p>
        <table cellpadding="0" cellspacing="0" role="presentation">
            <tbody>
            <tr>
                <td style="font-family:'Montserrat',sans-serif;height:20px">
                    From,<br> ${admin.userEmail}
                </td>
            </tr>
        </tbody></table>
        <p style="font-family:'Montserrat',sans-serif;margin:0;margin-top:24px">
            The CodingWorms team
        </p>
        
                                        <p></p></td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
                        <tr>
                            <td style="font-family:'Montserrat',sans-serif;height:20px"></td>
                        </tr>
                    </tbody></table>
                </td>
            </tr>
        </tbody></table>
    </div>
    
    <br>
    <div class="yj6qo"></div><div class="adL">
    </div></div>

    `
}