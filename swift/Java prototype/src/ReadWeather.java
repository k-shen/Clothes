import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

public class ReadWeather {
    public ReadWeather() {

    }

    public static int read() throws IOException {
        URL url = new URL("https://weather.com/weather/today/l/7f4ab889e3b2b04dc02ddb1ef3f18f97280f228af87b69624a8548a6d2936e70");
        BufferedReader br = new BufferedReader(
                new InputStreamReader(url.openStream()));  // creates buffer for URL

        String line = null;
        int index;
        int num = -100;
        // read each line and write to System.out
        while ((line = br.readLine()) != null) {
            index = line.indexOf("<span class=\"deg-feels\" className=\"deg-feels\">");  //finds where is the "feels like" temperature
            index += 46;

            if (index == 45) {
                continue;
            }

            String temp = line.substring(index, index + 3);  //cut out unnecessary content
            if (temp.substring(temp.length() - 1).equals("<")) {
                temp = temp.substring(0, temp.length() - 1);

            }
            num = Integer.valueOf(temp);

        }
        return num;
    }
}
