package jeanribac;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class MoreThreads extends Thread{
    private Socket socket;

    public MoreThreads(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {
        try {
            // we get the input from the client
            InputStreamReader inputStream = new InputStreamReader(socket.getInputStream());
            BufferedReader input = new BufferedReader(inputStream);
            // object to output to the client
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);

            while(true) {
                String message = input.readLine();
                System.out.println("Client input: " + message + " has been received");
                // exit the loop if the user types exit
                if(message.equals("exit")) {
                    break;
                }
                // x second delay to check the threads
                Thread.sleep(4000);
                output.println(message);
            }
        } catch(IOException err) {
            System.out.println("Error: " + err.getMessage());
        } finally {
            try {
                socket.close();
            } catch(IOException err) {
                System.out.println("Error: " + err.getMessage());
            }
        }
    }
}
