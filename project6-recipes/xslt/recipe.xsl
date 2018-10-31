<xsl:stylesheet version="2.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<head>
<title>
Recipes Home
</title>
<style>
legend {
color:red;
border:1px solid black;
}
</style>
</head>
<body>
<fieldset>
<legend> RECIPES </legend>
<xsl:for-each select="collection/recipe">
	<fieldset>
	   <legend align="right"> Recipe <xsl:value-of select="@id"/></legend>
	   <h3><xsl:value-of select="title"/></h3><br/>
           <h4>Date:</h4> <xsl:value-of select="date"/><br/>
	   <h4>Ingredient List:</h4> <br/>
                <xsl:for-each select="ingredient">
		<b>Name:</b> <xsl:value-of select="@name"/><br/>
		<b> Amount:</b> <xsl:value-of select="@amount"/>
		<b> Unit:</b> <xsl:value-of select="@unit"/><br/>
           		<xsl:for-each select="ingredient">
				<b>Name:</b> <xsl:value-of select="@name"/>
				<b> Amount:</b> <xsl:value-of select="@amount"/>
				<b> Unit:</b> <xsl:value-of select="@unit"/><br/>
                			<xsl:for-each select="ingredient">
						<b>Name:</b> <xsl:value-of select="@name"/>
						<b> Amount:</b> <xsl:value-of select="@amount"/>
						<b> Unit:</b> <xsl:value-of select="@unit"/><br/>
                   				<xsl:for-each select="ingredient">
							<b>Name:</b> <xsl:value-of select="@name"/>
							<b> Amount:</b> <xsl:value-of select="@amount"/>
							<b> Unit:</b> <xsl:value-of select="@unit"/><br/>
	   					</xsl:for-each><br/> 
					<xsl:if test="preparation/node()">
					<h4> Preparation for <xsl:value-of select="@name"/> </h4>
					</xsl:if>
                   			<xsl:copy-of select="preparation/node()">
                			</xsl:copy-of> <br/> 
	  				</xsl:for-each><br/> 
			<xsl:if test="preparation/node()">
			<h4> Preparation for <xsl:value-of select="@name"/> </h4>
			</xsl:if>
                    	<xsl:copy-of select="preparation/node()">
                	</xsl:copy-of> <br/> 
	   		</xsl:for-each><br/> 
		<xsl:if test="preparation/node()">
		<h4> Preparation for <xsl:value-of select="@name"/> </h4>
		</xsl:if>
	   	<xsl:copy-of select="preparation/node()">
                </xsl:copy-of> <br/>   
	   	</xsl:for-each><br/>
	   <h4>Preparation for <xsl:value-of select="title"/>:</h4> 
	   	<xsl:copy-of select="preparation/node()">
                </xsl:copy-of><br/>
	   <h4>Comment:</h4> <xsl:value-of select="comment"/><br/>
	   <h4>Nutrition information:</h4> 
	   <xsl:for-each select="nutrition">
		<b>Calories:</b> <xsl:value-of select="@calories"/>
		<b> Fat:</b> <xsl:value-of select="@fat"/>
		<b> Carbohydrates:</b> <xsl:value-of select="@carbohydrates"/> 
		<b> Protein:</b> <xsl:value-of select="@protein"/>
	   </xsl:for-each>	
	</fieldset>
</xsl:for-each>
</fieldset>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
