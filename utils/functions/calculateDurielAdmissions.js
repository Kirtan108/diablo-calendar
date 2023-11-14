function calculateDurielAdmissions(MSE, SoA) {
    const requiredPerAdmission = 2; // Define the requirement for one admission
    const eggCount = MSE || 0;
    const shardCount = SoA || 0;

    // Calculate the minimum number of admissions possible with available materials
    return Math.min(
        Math.floor(eggCount / requiredPerAdmission),
        Math.floor(shardCount / requiredPerAdmission)
    );
}

module.exports = calculateDurielAdmissions