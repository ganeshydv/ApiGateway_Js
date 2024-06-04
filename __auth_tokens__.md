
=====================================================
# authentication can be : 
## 1] stateless : if no session is stored in server
  Ex. if only jwt is verified for authentication
## 2] statefull : if session is stored in backend
 Ex. with every request cookies are sent which 
   contains session data and this session has Id
   i.e. sessionID using this user is validated and
   identified and his history is taken from session

 # ===================================================

IMP: When using a session store, such as Redis, 
the actual session data is stored on the server, 
and only a session identifier (usually a unique ID) 
is sent to the client as a cookie. 
  
Session = cookie + sessionID (unique)

in browser = set-header : { sessionID : cookie }

cookie contains encrypted data which only be 
decrypted using session secret
- on the server side if it is not decrypted it is 
inavalid session

 Ex. with every request cookies are sent which 
   contains session data and this session has Id
   i.e. sessionID using this user is validated and
   identified and his history is taken from session
  General process for Session :
    //The session data is typically stored 
    in the session store, such as Redis, 
    at the end of the request lifecycle

    // general process: 
  
   1] create session (cookie + userData ) and Attach to 
   REQUEST object not to RESPONSE object
  [ session = cookie + session data (can user data)]
  [ cookie = conatins sessionID and some other data ]
  - cookie is encrypted using session secret
  - add cookie to session with unique sessionID
  - at the end of request add session to storage
  - only COOKIE will be sent to client
  in RESPONSE header : set-cookie: { sessionID: cookie }

  2] client sends Back cookie in cookie header
  - 1) take cookie from header and 
      decrypt cookie using session secret
  - 2) search for session in redis using sessionID from cookie
  - 3) Attach session data from redis to REQUEST object
  - 4) as session conatins some user relead data use it 
       to perform user Specific tasks
  - 5) send RESPONSE  

# =========================================================
# --------- session ---------
- stored on server side
- sent with every request
- has uniques sessionID used for authentication of user
 how? check session present in backend db  
- stored in cookies on client side
- sent with each request to server
- sessionID is just a string
- session contains token

# --------- cookies ---------
-cookie is header just  like authorization or content-type
- Set-Header 
- signed with secret 
- can be encrypted
- url encoded : not for security but compat
- conatins sessionID token
- attributes : 1) Domain 2) Path 3) Expiration
- flags : 1) HttpOnly(can not read with js on browser) '
         2) secure(HTTPS only i.e only can be sent on TLS channel)
         3) SameSite (no CORS)

- CSRF Attack : Croos-site Resource Forgery
    - 

# =====================================================
## why access token and refresh token?
- let say there is microservice which handles payments
 if user needs to access so critical info then user needs
 to send a access token to this service 
- now who generates this access token ? this token ie. 
 access token as well as refresh token both are generated 
 by same service or server ex. api gateway or auth server
- now the thing is thei access token only be used in 
 payments service and this service should only can decrypt 
 this access token it means auth server and payments service
 both should have same secret 
- and it expires in minimum time
- if when user again want to access these critical data
it should send this access token if inavalid 
auth server regenerates this access token if and only if
there is refresh token 
- in this way instead of using only one token to access critical
data two different tokens are used so the payments service
become secure because token gets inavalid in some time
- remeber payments service only decrypt it and
 auth server it generates it but for generating it requires
 refresh token.

# =====================================================
### Id token: used by service to communicate with 3rd party service
### Access token: used by service to access another service
### Refresh token : used by service to get Access token and used with service



# ==================TOKEN based auth (stateless approach )===============
- tokens are not stored on server side only stored on client side
- ( sessions are stored on server side)
- signed with secret
- sent in Authorization header
-  XSS Attack may become easy
- used Web app, mobile apps
1) user logs in and token is generated and sent to client 
2) client stores token in storage and send with each request to server
3) server verifies token and grants access
4) if log out token is cleared from client storage (Ex. browser storage)

# ====== local Storage =====

- permanent
- different for each site so no other site can access
  i.e. Domain-Specific
- size 5MB > 4Kb cookie size
- Cons:
  - format plain text
  - limited to string format need to serialize to work with json
  - any JS code can read data so XSS Attack  is easy
   so can steal tokens

# ===== Session Storage =====
- cleared when page is loaded  

# ======================================================
1) access token :
               -issued when client/user wants to access secure data 
                ex. profiles updates,password changes ,payments,etc
               -used for secure API calls
               -access token tells server that client is authorized 
                to make the request on secure routes/ APIs
               - short life time
               - IMP : access tokens are transfered in URI fragment 
                so when using 3rd party authentication
                 it will expose this token to unauthorized 3rd party 
                 application as well so use
                 PKFCE 

2) Refresh token :
               - access token expires then use refresh token to get 
                new access token in this way user 
                does not need to login again until refresh token 
                expires
                - long life token
                - use ProofKeyCodeExchange (PKFCE) with refresh token
                - how to secure? 
                 1) Refresh token rotation : Always return refresh token 
                 as well with access token 
                 2) server stores these refresh tokens
                 3) when 2nd request is made it verifies refresh token 
                 if the token is the last one
                 it issues new access token as well refrsh token but 
                 if the token is not the last but
                 older one (checks it by finding in db) then server 
                 logs out user as there might be a
                 chance that user is not valid or legit - some one else 
                 is using it. 
                   -- agar user ko sirf ed device me login permission 
                   deni ho tab 
                 1) Refresh token rotation use karna 
                 -- hamesh request k object me referred URL ata hai to 
                 isse agar db me save kar k 
                 rakhenge to ye bhi verify kar sakte hai ki user same 
                 hi hai ya nhi 

3) Id token : used to take identity of user from 3rd party application
    ex. google,fb 
              and  use these details to build profile of that user in 
              our application
            - OpenID connect : it is used by authServer (Ex of google,fb ) 
            for authentication 
                  which issues idTOken to client (ex. our application )
                  when user logs In 

# ===================================================
https://www.youtube.com/watch?v=2PPSXonhIck

https://www.youtube.com/watch?v=kmAzuH2Lzug&list=PLcCp4mjO-z9_HmJ5rSonmiEGfP-kyRMlI
