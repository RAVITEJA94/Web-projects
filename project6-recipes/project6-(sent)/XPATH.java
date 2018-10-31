package xpath;

import java.util.Scanner;

import javax.xml.xpath.*;
import org.xml.sax.InputSource;
import org.w3c.dom.*;

class XPATH {

    static void print ( Node e ) {
	if (e instanceof Text)
	    System.out.print(((Text) e).getData());
	else {
	    NodeList c = e.getChildNodes();
	    System.out.print("<"+e.getNodeName());
	    NamedNodeMap attributes = e.getAttributes();
	    for (int i = 0; i < attributes.getLength(); i++)
		System.out.print(" "+attributes.item(i).getNodeName()
				 +"=\""+attributes.item(i).getNodeValue()+"\"");
	    System.out.print(">");
	    for (int k = 0; k < c.getLength(); k++)
		print(c.item(k));
	    System.out.print("</"+e.getNodeName()+">");
	}
    }

    static void eval ( String query, String document ) throws Exception {
	XPathFactory xpathFactory = XPathFactory.newInstance();
	XPath xpath = xpathFactory.newXPath();
	InputSource inputSource = new InputSource(document);
	NodeList result = (NodeList) xpath.evaluate(query,inputSource,XPathConstants.NODESET);
	System.out.println("XPath query: "+query);
	for (int i = 0; i < result.getLength(); i++)
	    print(result.item(i));
	System.out.println();
    }

    public static void main ( String[] args ) throws Exception {
    	
    	Scanner n= new Scanner(System.in);
    	int choice;
    	System.out.println("Welcome to Query land!!");
    	System.out.println("1.Print the titles of all articles whose one of the authors is David Maier.");
    	System.out.println("2.Print the titles of all articles whose first author is David Maier.");
    	System.out.println("3.Print the titles of all articles whose authors include David Maier and Stanley B. Zdonik.");
    	System.out.println("4.Print the titles of all articles in volume 19/number 2.");
    	System.out.println("5.Print the titles and the init/end pages of all articles in volume 19/number 2 whose authors include Jim Gray.");
    	System.out.println("6.Print the volume and number of all articles whose authors include David Maier.");
    	System.out.println("7.All the above queries");
    	System.out.println("Enter the query number you want to execute:");
    	choice= n.nextInt();
    	switch(choice)
    	{
    	     case 1: eval("//issue/articles/article[authors/author/text()='David Maier']/title","SigmodRecord.xml");
    	     		 break;
    	     			
    	     case 2: eval("//issue/articles/article[authors/author/text()='David Maier' and authors/author/@position='00']/title","SigmodRecord.xml");  
    	     		 break;
    	     		 
    	     case 3: eval("//issue/articles/article[authors/author/text()='David Maier' and authors/author/text()='Stanley B. Zdonik']/title","SigmodRecord.xml");
    	     		 break;
    	     		
    	     case 4: eval("//issue[volume='19' and number='2']/articles/article/title","SigmodRecord.xml");
    	     		 break;
    	     		 
    	     case 5: eval("//issue[volume='19' and number='2']/articles/article/authors/author[text()='Jim Gray']/../../*[self::initPage or self::endPage or self::title]","SigmodRecord.xml");
    	     		 break;
    	     		 
    	     case 6: eval("/SigmodRecord/issue/articles/article/authors/author[text()='David Maier']/../../../../*[self::volume or self::number ]","SigmodRecord.xml");
    	       		 break;
    	       		 
    	     case 7: eval("//issue/articles/article[authors/author/text()='David Maier']/title","SigmodRecord.xml");
    	     		 eval("//issue/articles/article[authors/author/text()='David Maier' and authors/author/@position='00']/title","SigmodRecord.xml");
    	     		 eval("//issue/articles/article[authors/author/text()='David Maier' and authors/author/text()='Stanley B. Zdonik']/title","SigmodRecord.xml");
    	     		 eval("//issue[volume='19' and number='2']/articles/article/title","SigmodRecord.xml"); 
    	     		 eval("//issue[volume='19' and number='2']/articles/article/authors/author[text()='Jim Gray']/../../*[self::initPage or self::endPage or self::title]","SigmodRecord.xml");//mine
    	     		 eval("/SigmodRecord/issue/articles/article/authors/author[text()='David Maier']/../../../../*[self::volume or self::number ]","SigmodRecord.xml");  		 
    	       		 break;
    	       		 
    	     default: System.out.println("Wrong Choice!!");
    	     		  break;
    	}
    	n.close();
    }
}