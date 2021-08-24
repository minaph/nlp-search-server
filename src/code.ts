
function doGet(e: GoogleAppsScript.Events.DoGet) {
  let requestCount = PropertiesService.getScriptProperties().getProperty('requestCount');
  let count = requestCount ? parseInt(requestCount, 10) : 0;
  if(count >= 100){
    // throw new Error('Too many requests');
    return HtmlService.createHtmlOutput('Too many requests');
  }
  count++;
  PropertiesService.getScriptProperties().setProperty('requestCount', count.toString());
  const resouce = getResouce(e.queryString);
  return ContentService.createTextOutput(resouce).setMimeType(ContentService.MimeType.JSON);
}

function getResouce(queryString: string) {
  const baseUrl = "https://www.googleapis.com/customsearch/v1?"
  const key = PropertiesService.getScriptProperties().getProperty('key');
  const url = baseUrl + "key=" + key + "&" +  queryString;
  return UrlFetchApp.fetch(url).getContentText();
}

function resetCount() {
  PropertiesService.getScriptProperties().setProperty('requestCount', '0');
}