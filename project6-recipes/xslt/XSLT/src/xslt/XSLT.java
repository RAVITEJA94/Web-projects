package xslt;

import java.io.File;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import org.w3c.dom.Document;


class XSLT {
    public static void main ( String argv[] ) throws Exception 
    {
	File stylesheet = new File("recipe.xsl");
	File xmlfile  = new File("recipes.xml");
	DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
	DocumentBuilder db = dbf.newDocumentBuilder();
	Document document = db.parse(xmlfile);
	StreamSource stylesource = new StreamSource(stylesheet);
	TransformerFactory tf = TransformerFactory.newInstance();
	Transformer transformer = tf.newTransformer(stylesource);
	DOMSource source = new DOMSource(document);
	StreamResult result = new StreamResult(System.out);
	transformer.transform(source,result);
    }
}
