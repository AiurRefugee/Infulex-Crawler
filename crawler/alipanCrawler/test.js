

fetch("https://api.aliyundrive.com/adrive/v4/batch", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4Y2Q1NzRhZTg5Yzk0YzIyODE0NTdmZmMzNjE0OTYwZCIsImN1c3RvbUpzb24iOiJ7XCJjbGllbnRJZFwiOlwiMjVkelgzdmJZcWt0Vnh5WFwiLFwiZG9tYWluSWRcIjpcImJqMjlcIixcInNjb3BlXCI6W1wiRFJJVkUuQUxMXCIsXCJTSEFSRS5BTExcIixcIkZJTEUuQUxMXCIsXCJVU0VSLkFMTFwiLFwiVklFVy5BTExcIixcIlNUT1JBR0UuQUxMXCIsXCJTVE9SQUdFRklMRS5MSVNUXCIsXCJCQVRDSFwiLFwiT0FVVEguQUxMXCIsXCJJTUFHRS5BTExcIixcIklOVklURS5BTExcIixcIkFDQ09VTlQuQUxMXCIsXCJTWU5DTUFQUElORy5MSVNUXCIsXCJTWU5DTUFQUElORy5ERUxFVEVcIl0sXCJyb2xlXCI6XCJ1c2VyXCIsXCJyZWZcIjpcImh0dHBzOi8vd3d3LmFsaXBhbi5jb20vXCIsXCJkZXZpY2VfaWRcIjpcImY4Y2YwODNkMDhmMjQ3YWM5YWRkOGIxYjk3MzhmNDMyXCJ9IiwiZXhwIjoxNzI1NjA1MzE3LCJpYXQiOjE3MjU1OTgwNTd9.b68HTGHt2kOvkWBdZkn5X9MSxoQtkpDtnpMPk3-oehRZj9-2zqMDLSNSB2fO3xIpZy8b7IZaPULhiUSQ_HTQCVgzHrtQ4d9xAphe9C2YRSUmZPzAxB_QJcr5d0yvSgjcnHR6sOUycnAObUre5DiFOblQzSRA2AH3X4GVNUGo00g",
      "content-type": "application/json",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Microsoft Edge\";v=\"127\", \"Chromium\";v=\"127\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "x-canary": "client=web,app=adrive,version=v6.3.0",
      "x-device-id": "mWNcH2rl0CkCATFJYKUiZcVP",
      "x-signature": "71242d4e275e7d1a9c3cc2617d7a329f666677b35757f134347b74ce8ec2b5f2152bdc93a7b4a268a33877063aca4bc29bf0dd49e84763a0efbaf3fb2d7421db01",
      "Referer": "https://www.alipan.com/",
      "Referrer-Policy": "origin"
    },
    "body": "{\"requests\":[{\"body\":{\"drive_id\":\"563295941\",\"file_id\":\"66da9bc2a97cec6d99964d8aac756ca0453faea1\"},\"headers\":{\"Content-Type\":\"application/json\"},\"id\":\"66da96deab6382b6a8404dda99c5ef9e3cdd5ba6\",\"method\":\"POST\",\"url\":\"/file/delete\"}],\"resource\":\"file\"}",
    "method": "POST"
  }).then( res => res.json()).then( res => console.log(res))