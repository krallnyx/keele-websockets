# Pre Requisites

Google Cloud Project is created, Cloud Build, Cloud Run and Cloud DNS APIs enabled.
If you're using a [custom domain mapping](https://cloud.google.com/run/docs/mapping-custom-domains), you need to verify the base domain through the [webmaster's console](https://www.google.com/webmasters/verification)

Service account created, and granted roles:
- DNS Administrator
- Cloud Build Service Account

In GitLab, set up a CI/CD Variable for `GCP_PROJECT_ID` and `MOD3_SERVICEACCOUNT_KEY`.  Generate a JSON key file for the service account, and copy/paste the contents as the value of the `MOD3_SERVICEACCOUNT_KEY` variable.  Remember to align protected variables and [protected branches](https://docs.gitlab.com/ee/user/project/protected_branches.html) (if you're using either).

> :warning: The Cloud Build service account (NOT the GitLab runner service account!) needs to be listed as a verified admin of the domain at the [webmaster's console](https://www.google.com/webmasters/verification)
