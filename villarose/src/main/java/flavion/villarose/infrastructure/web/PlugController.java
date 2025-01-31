package flavion.villarose.infrastructure.web;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;

@RestController
@RequestMapping("/plugs")
public class PlugController {
    private static final String TUYA_API_BASE_URL = "https://openapi.tuyaeu.com/v1.0/";
    private static final String API_KEY = "whq3xe3rgxemwhpvwa4r"; //#Ew_{j:QG|o_oIWA@
    private static final String API_SECRET = "f844aaeba94843ccb6f0d3c619a0a3ca";
    private static String ACCESS_TOKEN = "";  // Obtain access token first
    private static final String DEVICE_ID = "bfbc1b7c3b85a13abfdt0v";  // The device ID of the smart plug

    @GetMapping()
    public String turnOn() throws Exception {
        return sendTuyaRequest("on");
    }


    public static String getAccessToken() throws Exception {
        // Construct URL for the token request
        URL url = new URL(TUYA_API_BASE_URL + "token");
        System.out.println("get token from " + url); //todo
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        // Set the request method to POST
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");

        // Construct the body with API Key and API Secret
        String body = "{"
                + "\"client_id\": \"" + API_KEY + "\","
                + "\"secret\": \"" + API_SECRET + "\","
                + "\"grant_type\": \"client_credentials\""
                + "}";

        // Send the request body
        connection.setDoOutput(true);
        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = body.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        // Get the response code and data
        int responseCode = connection.getResponseCode();
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }

        in.close();

        if (responseCode == HttpURLConnection.HTTP_OK) {
            return response.toString();  // JSON response containing the access token
        } else {
            throw new Exception("Error obtaining access token: " + responseCode);
        }
    }

    // Method to send the API request to turn the plug on or off
    public static String sendTuyaRequest(String action) throws Exception {
        ACCESS_TOKEN = getAccessToken();
        System.out.println("Access Token Response: " + ACCESS_TOKEN);

        String url = TUYA_API_BASE_URL + "devices/" + DEVICE_ID + "/commands";
        System.out.println("\n\n" + url); //todo
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        con.setRequestMethod("POST");
        con.setRequestProperty("Authorization", "Bearer " + ACCESS_TOKEN);
        con.setRequestProperty("Content-Type", "application/json");

        // JSON payload to turn on/off the smart plug
        JSONObject payload = new JSONObject();
        payload.put("commands", new JSONObject[] {
                new JSONObject().put("code", "switch").put("value", action.equals("on"))
        });

        con.setDoOutput(true);
        try (OutputStream os = con.getOutputStream()) {
            byte[] input = payload.toString().getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        // Get the response
        int responseCode = con.getResponseCode();
        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }

        in.close();

        return "Response Code: " + responseCode + "\nResponse: " + response.toString();
    }
}
