
# <span style="color:#32BB64">cash</span><span style="color:orange">fair</span>

## Functional specification

### Project vision

A web application where people can register cash payments and send money to each other via e.g Swish, which can be implemented using the Swish developer API. The webapp will feature a dashboard where users can see all pending and complete payments. Payments can be registered with individual users and groups of users. The major difference would be that instead of allowing a sender to register a cash payment by temselves, the cash payment needs to be verified by the receiver before being accepted by the system and logged. A user can also request a cash payment or loan from another user. The webapp is basically our own take on Splitwise, with a simpler interface and with more functionality.

### Core features

<ul>
    <li>Record payments to other users, has to be verified by receiver</li>
    <li>Register loans to and from other users</li>
    <li>Request payment from other users</li>
    <li>Create groups and register group payments</li>
    <li>Integrated payment using Swish</li>
    <li>Transaction history</li>
</ul>

## Technological specification
**Front-end:** The planned front-end framework for the project is React, since both project members have used Vue + Django prior to this project and wish to try out using React in a project.

**Back-end:** The planned back-end framework for this project is Flask, which has been slightly used by both project members in the basic web programming course (TDDD97). This is an opportunity to get more familiar with Flask.
