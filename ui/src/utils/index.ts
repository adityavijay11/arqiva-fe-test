import { ContributionStatus } from "../types";

export function getDateTime(timeStamp: string) {
  const date = new Date(timeStamp);
  return date.toLocaleString();
}

export function getContributionStatus(
  startTimeStamp: string,
  endTimeStamp: string,
) {
  const startDate = new Date(startTimeStamp);
  const endDate = new Date(endTimeStamp);
  const currentDate = new Date();
  if (
    endDate.getTime() > currentDate.getTime() &&
    startDate.getTime() < currentDate.getTime()
  ) {
    return ContributionStatus.Active;
  } else if (startDate.getTime() > currentDate.getTime()) {
    return ContributionStatus.Scheduled;
  } else if (endDate.getTime() < currentDate.getTime()) {
    return ContributionStatus.Complete;
  }
  return ContributionStatus.unknown;
}
