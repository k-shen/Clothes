import java.io.IOException;
import java.util.ArrayList;

public class ClothesOptions {
    public static String[] bottom = {"Shorts", "Pants/Jeans/Jogger"};
    public static String[] top = {"Short-sleeve T", "Long-sleeve T", "Hoodie", "Jacket", "Coat"};
    public static int[] bottomI = {8, 20};
    public static int[] topI = {8, 12, 18, 22, 35};
    public static final int COMFORT = 85;
    public static String choices = "";

    public static void main(String[] args) throws IOException {
        ReadWeather tempS = new ReadWeather();
        int tempI = tempS.read();  // reads current temperature in West Lafayette IN
        Options(tempI);
    }

    public static void Options(int temp) {
        int bottomChoice = BottomOptions(temp);
        System.out.println(bottom[bottomChoice]);
        String topChoice = TopOptions(COMFORT - temp - bottomI[bottomChoice]);
        for (int i = 0; i < topChoice.length(); i++) {
            int layer = Integer.parseInt(topChoice.substring(i, i + 1));
            System.out.println(top[layer]);
        }

    }

    public static int BottomOptions(int temp) {
        if (temp < 55) {
            return 1;           // 55 or lower will give pants option
        } else {                // 55 or higher will give shorts option
            return 0;
        }
    }

    public static String TopOptions(int temp) {
        int choice = 0;
        if (temp > 3) {
            if (temp > 20) {        // if it requires a jacket or coat
                choice = (Math.abs(topI[3] - temp) < Math.abs(topI[4] - temp)) ? 3 : 4;
                choices = choices + choice;

            } else {
                int difference = Math.abs(topI[0] - temp);
                for (int i = 0; i < 3; i++) {
                    if (Math.abs(topI[i] - temp) < difference) {
                        difference = Math.abs(topI[i] - temp);
                        choice = i;
                    }
                }
                return String.valueOf(choice);
            }

            choices = choices + TopOptions(temp - topI[choice]);
        } else {
            choices += choice;
        }

        return choices;
    }
}
