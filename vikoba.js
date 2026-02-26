alert("contributions")
app.post('/contribute', async (req, res) => {
    const { memberId, amount } = req.body;

    if (amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
    }

    // Save contribution
    await Contribution.create({
        member_id: memberId,
        amount: amount,
        date: new Date()
    });

    // Update total savings
    const member = await Member.findByPk(memberId);
    member.total_savings += amount;
    await member.save();

    res.json({ message: "Contribution recorded successfully" });
});