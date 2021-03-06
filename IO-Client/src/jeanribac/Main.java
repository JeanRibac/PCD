package jeanribac;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.SocketTimeoutException;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        try(Socket socket = new Socket("127.0.0.1", 5000)) {
            // terminate the client application if it does not respond in 10 seconds
            socket.setSoTimeout(10000);
            // getting the input from server
            InputStreamReader inputStream = new InputStreamReader(socket.getInputStream());
            BufferedReader input = new BufferedReader(inputStream);
            //we create the output object in order to send the message to the server
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);

            Scanner scanner = new Scanner(System.in);
            String echoString;
            do {
                System.out.println("Enter string to be echoed: ");
                // read string from console
                echoString = scanner.nextLine();
                output.println(echoString);

                if(!echoString.equals("exit")) {
                    String response = input.readLine();
                    System.out.println(response);
                }
            } while (!echoString.equals("exit"));
        } catch(SocketTimeoutException err) {
            System.out.println("Socket timed: " + err);
        } catch(IOException err) {
            System.out.println("Client Error: " + err.getMessage());
        }
    }
}

