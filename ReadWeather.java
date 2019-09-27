import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

public class ReadWeather {
    public static void main(String[] args) throws IOException{
        URL url = new URL("https://weather.com/weather/today/l/7f4ab889e3b2b04dc02ddb1ef3f18f97280f228af87b69624a8548a6d2936e70");
        BufferedReader br = new BufferedReader(
                new InputStreamReader(url.openStream()));

        String line = null;
        int index;
        int num;
        // read each line and write to System.out
        while ((line = br.readLine()) != null) {
            index = line.indexOf("<span class=\"deg-feels\" className=\"deg-feels\">");
            index += 46;
            //System.out.println(index);
            //System.out.println(line.length());
            //System.out.println(line);


            if (index == 45){
                continue;
            }

            String temp = line.substring(index, index + 3);
            if (temp.substring(temp.length()-1).equals("<")) {
                temp = temp.substring(0, temp.length()-1);

            }
            num = Integer.valueOf(temp);
            System.out.println(num);

        }

    }
}
