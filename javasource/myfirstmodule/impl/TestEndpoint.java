package myfirstmodule.impl;

import javax.websocket.CloseReason;
import javax.websocket.Endpoint;
import javax.websocket.EndpointConfig;
import javax.websocket.MessageHandler;
import javax.websocket.Session;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.mendix.core.Core;
import com.mendix.logging.ILogNode;
import com.mendix.systemwideinterfaces.core.ISession;
import com.mendix.thirdparty.org.json.JSONObject;

public class TestEndpoint extends Endpoint {
  static Set<Session> sessions = new HashSet<>();
  public static ILogNode LOG = Core.getLogger("Luckysheet");

  @Override
  public void onOpen(Session session, EndpointConfig config) {
    String sessionId = (String) config.getUserProperties().get("mxSessionId");
    ISession mxSession = Core.getSessionById(UUID.fromString(sessionId));
    String username = mxSession.getUserName();
    session.getUserProperties().put("username", username);
    sessions.add(session);

    
  }

  public static void sendMsg(String msg){
    sessions.forEach(s -> {
      try {
        s.getBasicRemote().sendText(msg);
      } catch (IOException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }
    });
  }

  @Override
  public void onClose(Session session, CloseReason closeReason) {
    LOG.info("Received onClose call with reason: " + closeReason);
    sessions.remove(session);
  }
}
