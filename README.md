# questionandanswers-sdc

This microservice powers the Q&A section of our e-commerce platform. Improved database performance with optimized PostgreSQL queries using indexing. Thoroughly stress-tested locally with k6 and in production with loader.io. Finally, implemented efficient traffic distribution using NGINX and AWS EC2 instances for a seamless user experience

## Biggest Takeaways/ Accomplishments

1. Understanding my goal was to meet the standard of <2000 ms and <1% error rate in my testing.

2. Tested  get request endpoint by querying the bottom half of my database (query for product_id: 1000011)
   - 225 rps met the standard, and I got up to 700 to 800 rps with > 2000ms before it started to timeout excessively.
  
3. I ended up using a load balancer and one extra ec2 server (2 total) to improve efficiency.
   - Tested out different load balancing strategies and weights(round robin,least connection, hash ip), and got up to a little over 300 rps to meet the standard.
  
 4. I think the number of queries I make for this particular endpoint(initial get request for questions) might be bottlenecking my system at higher rps.

[Engineering Journal](https://docs.google.com/document/d/1E6Deveixe02r7eI4bfvuKAr42WNacq2l5Hzlne3lWbw/edit
)

[DB, system testing](https://docs.google.com/document/d/10lrffbcBamJub9XkEBfo6X5LiSyyQ5jUqEZVHr7twxo/edit)

| HTTP Method | Route                                      | Description                         |
|-------------|--------------------------------------------|-------------------------------------|
| GET         | /qa/questions                              | Get all questions                    |
| GET         | /qa/questions/:question_id/answers         | Get answers for a specific question  |
| POST        | /qa/questions                              | Post a new question                  |
| POST        | /qa/questions/:question_id/answers         | Post an answer for a specific question |
| PUT         | /qa/questions/:question_id/helpful         | Mark a question as helpful           |
| PUT         | /qa/questions/:question_id/report          | Report a question                    |
| PUT         | /answers/:answer_id/helpful                | Mark an answer as helpful            |
| PUT         | /answers/:answer_id/report                 | Report an answer                     |

