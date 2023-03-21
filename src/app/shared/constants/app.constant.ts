import { environment } from "src/environments/environment"

export const Constant = {
  appName: "EasyEarn",
  apiBaseUrl: environment.API_URL
}


export const Plans = Object.freeze([
  { planId: 1, planName: "Package 1", amount: 200 },
  { planId: 2, planName: "Package 2", amount: 400 },
  { planId: 3, planName: "Package 3", amount: 800 },
  { planId: 4, planName: "Package 4", amount: 1600 },
  { planId: 5, planName: "Package 5", amount: 3200 },
  { planId: 6, planName: "Package 6", amount: 6400 },
  { planId: 7, planName: "Package 7", amount: 12800 },
  { planId: 8, planName: "Package 8", amount: 25600 },
  { planId: 9, planName: "Package 9", amount: 51200 },
  { planId: 10, planName: "Package 10", amount: 102400 },
])
