package jeanribac;

import java.io.IOException;
import java.net.ServerSocket;

public class Main {

    public static void main(String[] args) {
        try(ServerSocket serverSocket = new ServerSocket(5000)) {
            // the server needs to be able to be accessed by many clients
            while(true) {
                // new Thread is created for each client
                new MoreThreads(serverSocket.accept()).start();
            }
        } catch(IOException err) {
            System.out.println("Server exception" + err.getMessage());
            err.printStackTrace();
        }
    }
}
