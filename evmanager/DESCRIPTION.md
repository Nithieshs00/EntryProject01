# Credmarg Take Home Test

## Overview

At Credmarg, we are supercharging the effectiveness of the SMEs by building software to simplify the employee and vendor payment flows.

We are focusing on SMEs as our initial customer. A SMEs can have admins, admins will manage employees and vendors of the SMEs.

## Problem

Your task is to create a full-stack application that can do the following:

- Allows admin to create and save employees and their metadata (name, designation, CTC, and email)
- Allows admin to create and save vendors and their metadata (name, email, upi)
- Allows admin to send an email to a list of vendors with a templated message (i.e. "Sending payments to vendor { name } at upi { upi }") and sends the email with the templated fields populated
- Allows admin to view all the emails that have been sent to vendors
- Allows admin to view all vendors and employees that he has created

You can make the following assumptions

- Email is a unique identifier for both vendors and employees
- Assume the data passed into the API endpoints will be valid (i.e. you don't need to check for bad request data)

The backend should persist the data (in-memory is sufficient). For sending email, you typically would rely on using a third-party email sending client such as sendgrid. However, in this exercise, simply mock the email client on the backend and have it print out what the email will look like when someone makes an API request.

## Deliverable

We want you to solve this solution with Java on the backend and React/NextJS on the frontend. 

Be ready to share your screen and describe your solution during the technical interview.

## Questions

Some parts of this question were left vague on purpose to see what you come up with. However, if the some instructions are unclear, don't hesitate to email vishal@kilope.com for further clarification.
