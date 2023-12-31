// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
// Special characters, e.g., é, ö, à, etc. are supported in comments.

package mqttclient.actions;

import com.mendix.core.Core;
import com.mendix.logging.ILogNode;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.webui.CustomJavaAction;
import mqttclient.impl.MqttConnector;

public class MqttSubscribe extends CustomJavaAction<java.lang.Boolean>
{
	private java.lang.String BrokerHost;
	private java.lang.Long BrokerPort;
	private java.lang.String BrokerOrganisation;
	private java.lang.Long Timeout;
	private java.lang.String Username;
	private java.lang.String Password;
	private java.lang.String TopicName;
	private java.lang.String OnMessageMicroflow;
	private java.lang.String CA;
	private java.lang.String ClientCertificate;
	private java.lang.String ClientKey;
	private java.lang.String CertificatePassword;
	private mqttclient.proxies.qos QoS;

	public MqttSubscribe(IContext context, java.lang.String BrokerHost, java.lang.Long BrokerPort, java.lang.String BrokerOrganisation, java.lang.Long Timeout, java.lang.String Username, java.lang.String Password, java.lang.String TopicName, java.lang.String OnMessageMicroflow, java.lang.String CA, java.lang.String ClientCertificate, java.lang.String ClientKey, java.lang.String CertificatePassword, java.lang.String QoS)
	{
		super(context);
		this.BrokerHost = BrokerHost;
		this.BrokerPort = BrokerPort;
		this.BrokerOrganisation = BrokerOrganisation;
		this.Timeout = Timeout;
		this.Username = Username;
		this.Password = Password;
		this.TopicName = TopicName;
		this.OnMessageMicroflow = OnMessageMicroflow;
		this.CA = CA;
		this.ClientCertificate = ClientCertificate;
		this.ClientKey = ClientKey;
		this.CertificatePassword = CertificatePassword;
		this.QoS = QoS == null ? null : mqttclient.proxies.qos.valueOf(QoS);
	}

	@java.lang.Override
	public java.lang.Boolean executeAction() throws Exception
	{
		// BEGIN USER CODE
        try {
            MqttConnector.subscribe(this.BrokerHost, this.BrokerPort, this.BrokerOrganisation, this.TopicName, this.OnMessageMicroflow, this.CA, this.ClientCertificate, this.ClientKey, this.CertificatePassword, this.Username, this.Password, this.QoS, this.Timeout);
            return true;
        } catch (Exception e) {
            return false;
        }
		// END USER CODE
	}

	/**
	 * Returns a string representation of this action
	 * @return a string representation of this action
	 */
	@java.lang.Override
	public java.lang.String toString()
	{
		return "MqttSubscribe";
	}

	// BEGIN EXTRA CODE
	// END EXTRA CODE
}
